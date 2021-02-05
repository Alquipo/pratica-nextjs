import { client } from "@/lib/prismic";
import { GetStaticPaths, GetStaticProps } from "next";
import { useRouter } from "next/router";
import PrismicDom from "prismic-dom";
import { Document } from "prismic-javascript/types/documents";

type ProductProps = {
  product: Document;
};

export default function Product({ product }: ProductProps) {
  const router = useRouter();

  if (router.isFallback) {
    return <p>Carregando...</p>;
  }

  return (
    <div>
      <h1>{PrismicDom.RichText.asText(product.data.title)}</h1>

      <div
        dangerouslySetInnerHTML={{
          __html: PrismicDom.RichText.asHtml(product.data.description),
        }}
      />

      <img src={product.data.thumbnail.url} width="300" alt="" />

      <p>Price: ${product.data.price}</p>
    </div>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps<ProductProps> = async (context) => {
  const { slug } = context.params;

  const product = await client().getByUID("product", String(slug), {});

  return {
    props: {
      product,
    },
    revalidate: 5,
  };
};
