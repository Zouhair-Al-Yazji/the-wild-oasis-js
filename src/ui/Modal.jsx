import { createContext, useState, useContext, cloneElement } from 'react';
import { createPortal } from 'react-dom';
import styled from 'styled-components';
import { HiXMark } from 'react-icons/hi2';
import useOutsideClick from '../hooks/useOutsideClick';

const StyledModal = styled.div`
	position: fixed;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	background-color: var(--color-grey-0);
	border-radius: var(--border-radius-lg);
	box-shadow: var(--shadow-lg);
	padding: 3.2rem 4rem;
	transition: all 0.5s;
`;

const Overlay = styled.div`
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: 100vh;
	background-color: var(--backdrop-color);
	backdrop-filter: blur(4px);
	z-index: 1000;
	transition: all 0.5s;
`;

const Button = styled.button`
	background: none;
	border: none;
	padding: 0.4rem;
	border-radius: var(--border-radius-sm);
	transform: translateX(0.8rem);
	transition: all 0.2s;
	position: absolute;
	top: 1.2rem;
	right: 1.9rem;

	&:hover {
		background-color: var(--color-grey-100);
	}

	& svg {
		width: 2.4rem;
		height: 2.4rem;
		fill: var(--color-grey-500);
		stroke: var(--color-grey-500);
		color: var(--color-grey-500);
	}
`;
// a compound component pattern
//  the idea of compound component pattern is that we can create a set of related components that together achieve a common and useful task

// so the way we implement this is that we create a parent component and then a few different child components that really belong to parent component, and that really only make sense when used together with the parent component

// a good example of this is the HTML select element and options elements

// 1. Create a context
const ModalContext = createContext();

// 2. Create a parent component include state and function to pass to children component via the context provider
export default function Modal({ children }) {
	const [openName, setOpenName] = useState('');
	const close = () => setOpenName('');
	const open = setOpenName;

	return (
		<ModalContext.Provider value={{ openName, close, open }}>{children}</ModalContext.Provider>
	);
}

// 3. Create child components to help implementing common task
function Open({ children, opens: opensWindowName }) {
	const { open } = useContext(ModalContext);

	return cloneElement(children, { onClick: () => open(opensWindowName) });
}

function Window({ children, name }) {
	// react Portal is a feature that essentially allows us to render an element outside of the parent component's DOM structure while still keeping the element in the original position of the component tree

	// basically we can render a component in any place that we want inside the DOM tree but still leave the component at the same place in the react component tree and things like props keep working normally

	const { openName, close } = useContext(ModalContext);
	const ref = useOutsideClick(close);
	if (name !== openName) return null;

	return createPortal(
		<Overlay>
			<StyledModal ref={ref}>
				<Button onClick={close}>
					<HiXMark />
				</Button>

				{/* cloneElement() takes two arguments the first the jsx element that you need to clone and the second is the props that you want to add to the cloned element */}
				<div>{cloneElement(children, { onCloseModal: close })}</div>
			</StyledModal>
		</Overlay>,
		document.body
	);
}

// 4. Add child component as properties to parent component
Modal.Open = Open;
Modal.Window = Window;
