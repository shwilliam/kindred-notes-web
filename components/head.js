import DocumentHead from 'next/head'

export const Head = ({title, description="Spread kindness ♡"}) => (
  <DocumentHead>
    <title>{title}</title>
    <meta name="description" content={description} />
  </DocumentHead>
)
