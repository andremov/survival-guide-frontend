import '../styles/main.scss'
import store from '../services/store'
import { Provider } from 'react-redux'
import { AppWrapper } from '../components/AppWrapper';
import Head from 'next/head';
import React from 'react';

function MyApp( props ) {
	return <Provider store={ store }>
		<Head>
			<title>Guía de Supervivencia</title>
			<meta name="description" content="¿Como sobrevivir sin supervisión?"/>
			<link rel="icon" href="/favicon.ico"/>
		</Head>

		<AppWrapper
			{...props}
		/>
	</Provider>
}

export default MyApp
