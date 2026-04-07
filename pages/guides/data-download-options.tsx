import { Main } from "@databiosphere/findable-ui/lib/components/Layout/components/ContentLayout/components/Main/main";
import { Nav } from "@databiosphere/findable-ui/lib/components/Layout/components/Nav/nav";
import { ContentView } from "@databiosphere/findable-ui/lib/views/ContentView/contentView";
import { GetStaticProps, InferGetStaticPropsType } from "next";
import { MDXRemote } from "next-mdx-remote";
import { JSX } from "react";
import { Content } from "../../app/components/Layout/components/Content/content";
import { MDX_COMPONENTS } from "../../app/content/common/constants";
import { getContentStaticProps } from "../../app/content/common/contentPages";
import {
  DATA_DOWNLOAD_OPTIONS,
  DATA_DOWNLOAD_VIA_CURL,
  DATASET_MANIFEST_DOWNLOAD,
  GUIDES,
  INDIVIDUAL_FILE_DOWNLOAD,
} from "../../site-config/anvil-cmg/dev/layout/navigationItem";
import NotFoundPage from "../404";

const slug = ["guides", "data-download-options"];

export const getStaticProps: GetStaticProps = async () => {
  return getContentStaticProps({ params: { slug } }, "Data Download Options");
};

const Page = ({
  layoutStyle,
  mdxSource,
}: InferGetStaticPropsType<typeof getStaticProps>): JSX.Element => {
  if (!mdxSource) return <NotFoundPage />;
  return (
    <ContentView
      content={
        <Content>
          <MDXRemote {...mdxSource} components={MDX_COMPONENTS} />
        </Content>
      }
      navigation={
        <Nav
          navigation={[
            GUIDES,
            { active: true, ...DATA_DOWNLOAD_OPTIONS },
            DATASET_MANIFEST_DOWNLOAD,
            DATA_DOWNLOAD_VIA_CURL,
            INDIVIDUAL_FILE_DOWNLOAD,
          ]}
        />
      }
      layoutStyle={layoutStyle ?? undefined}
    />
  );
};

Page.Main = Main;

export default Page;
