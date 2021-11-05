import React from 'react';
import { faFileInvoiceDollar, faTasks, faHome } from '@fortawesome/free-solid-svg-icons';
import { Link } from './Buttons';

export function Header() {
	return (
		<header>
			<Link
				href={'/'}
				icon={faHome}
				label={'Inicio'}
			/>
			<Link
				href={'/tasks'}
				icon={faTasks}
				label={'Tareas'}
			/>
			<Link
				href={'/bills'}
				icon={faFileInvoiceDollar}
				label={'Facturas'}
			/>
		</header>
	);
}

