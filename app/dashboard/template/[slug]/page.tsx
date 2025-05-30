import React from 'react';

export default function Page({ params }: { params: string }) {
	return <div>{JSON.stringify(params)}</div>;
}
