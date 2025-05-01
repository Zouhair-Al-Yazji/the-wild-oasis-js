import Counter from './Counter';
import { HiPlus, HiMinus } from 'react-icons/hi2';
export default function CompoundComponentPattern() {
	//  the idea of compound component pattern is that we can create a set of related components that together achieve a common and useful task

	// so the way we implement this is that we create a parent component and then a few different child components that really belong to parent component, and that really only make sense when used together with the parent component

	// a good example of this is the HTML select element and options elements

	return (
		<div>
			<h1>Compound Component Pattern</h1>

			<Counter>
				<Counter.Label>My not so flexible counter</Counter.Label>
				<div>
					<Counter.Decrease icon={'◀️'} />
					<Counter.Count />
					<Counter.Increase icon={'▶️'} />
				</div>
			</Counter>
		</div>
	);
}
