interface PageMetaProps {
  title: string
  description: string
}

/** `title` y `meta description` de la ruta. React 19 los lleva al `<head>`. */
export default function PageMeta({ title, description }: PageMetaProps) {
  return (
    <>
      <title>{title}</title>
      <meta name="description" content={description} />
    </>
  )
}
