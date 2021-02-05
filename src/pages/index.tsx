import { GetServerSideProps } from "next";
import { Title } from "@/styles/pages/Home";
import SEO from "@/components/SEO";

type ProductProps = {
  id: string;
  title: string;
};

type HomeProps = {
  recommendedProducts: ProductProps[];
};

export default function Home({ recommendedProducts }: HomeProps) {
  return (
    <div>
      <SEO
        title="DevCommerce, your best e-commerce"
        shouldExcludeTitleSuffix
        description="testesetst"
        image="boost.png"
      />
      <section>
        <Title>Products</Title>

        <ul>
          {recommendedProducts.map((recommendedProduct) => {
            return (
              <li key={recommendedProduct.id}>{recommendedProduct.title}</li>
            );
          })}
        </ul>
      </section>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps<HomeProps> = async () => {
  const response = await fetch("http://localhost:3333/recommended");
  const recommendedProducts = await response.json();

  return {
    props: {
      recommendedProducts,
    },
  };
};
