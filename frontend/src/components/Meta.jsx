import { Helmet } from "react-helmet-async";

const Meta = ({title, description, keywords}) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description}/>
      <meta name="keywords" content={keywords}/>
    </Helmet>
  )
}

Meta.defaultProps = {
  title: "Proshop",
  description: "Your favourite online store",
  keywords: 'electronice, grocery, furniture, goods'
}

export default Meta