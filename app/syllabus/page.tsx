'use client'


import React from "react";
import useSWR from "swr";
type Props = {};

const fetcher = (...args: [input: RequestInfo, init?: RequestInit]) => 
    fetch(...args).then((res) => res.json() as Promise<any>);
  


export default function page({}: Props) {
  const { data, error, isLoading } = useSWR(
    "http://130.51.120.58:8080/api/v1/read_syllabus",
    fetcher
  );

  if (error) return <div>failed to load</div>;
  if (isLoading) return <div>loading...</div>;

  if(data)console.log(data.data[0]);
  // render data
  return <div>hello {JSON.stringify(data.data[0])}!</div>;
}
