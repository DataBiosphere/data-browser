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
  ABOUT_ANVIL_EXPLORER,
  DATA_DOWNLOAD_OPTIONS,
  DATA_DOWNLOAD_VIA_CURL,
  INDIVIDUAL_FILE_DOWNLOAD,
  TSV_FILE_MANIFEST_DOWNLOAD,
} from "../../site-config/anvil-cmg/dev/layout/navigationItem";
const slug = ["guides", "individual-file-download"];

export const getStaticProps: GetStaticProps = async () => {
  return getContentStaticProps(
    { params: { slug } },
    "Individual File Download"
  );
};

const Page = ({
  layoutStyle,
  mdxSource,
}: InferGetStaticPropsType<typeof getStaticProps>): JSX.Element => {
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
            ABOUT_ANVIL_EXPLORER,
            DATA_DOWNLOAD_OPTIONS,
            TSV_FILE_MANIFEST_DOWNLOAD,
            DATA_DOWNLOAD_VIA_CURL,
            { active: true, ...INDIVIDUAL_FILE_DOWNLOAD },
          ]}
        />
      }
      layoutStyle={layoutStyle ?? undefined}
    />
  );
};

Page.Main = Main;

export default Page;
