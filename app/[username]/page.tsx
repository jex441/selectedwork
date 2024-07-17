import React from 'react'

export default function page({ params }: { params: { slug: string } }) {
  const { slug } = params;
  return (
    <div>Page</div>
  )
}
