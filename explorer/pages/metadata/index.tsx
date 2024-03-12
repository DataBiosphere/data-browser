import { Main } from "@clevercanary/data-explorer-ui/lib/components/Layout/components/ContentLayout/components/Main/main";
import { ContentView } from "@clevercanary/data-explorer-ui/lib/views/ContentView/contentView";
import { GetStaticProps, InferGetStaticPropsType } from "next";
import { MDXRemote } from "next-mdx-remote";
import { ContentTheme } from "../../app/components/common/Content/components/ContentTheme/contentTheme";
import { MDX_COMPONENTS, MDX_SCOPE } from "../../app/content/common/constants";
import { getContentStaticProps } from "../../app/content/common/contentPages";
import NotFoundPage from "../404";

const slug = ["metadata"];

export const getStaticProps: GetStaticProps = async () => {
  return getContentStaticProps({ params: { slug } }, "Metadata Dictionary");
};

const Page = ({
  layoutStyle,
  mdxSource,
}: InferGetStaticPropsType<typeof getStaticProps>): JSX.Element => {
  if (!mdxSource) return <NotFoundPage />;
  return (
    <ContentView
      content={
        <ContentTheme>
          <MDXRemote
            {...mdxSource}
            components={MDX_COMPONENTS}
            scope={MDX_SCOPE}
          />
        </ContentTheme>
      }
      layoutStyle={layoutStyle ?? undefined}
    />
  );
};

Page.Main = Main;

export default Page;
