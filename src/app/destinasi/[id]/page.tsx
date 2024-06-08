import React from "react";

function Page({ params }: { params: { id: string } }) {
  const { id } = params;

  console.log(id);
  return <div>Page {id}</div>;
}

export default Page;
