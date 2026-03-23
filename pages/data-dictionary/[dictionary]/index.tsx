import { JSX } from "react";
import { DataDictionaryView } from "@databiosphere/findable-ui/lib/views/DataDictionaryView/dataDictionaryView";
import { Main } from "@databiosphere/findable-ui/lib/components/Layout/components/ContentLayout/components/Main/main";
import { ParsedUrlQuery } from "querystring";
import {
  GetStaticPaths,
  GetStaticPropsContext,
  GetStaticPropsResult,
} from "next";
import { config } from "../../../app/config/config";

interface PageUrlParams extends ParsedUrlQuery {
  dictionary: string;
}

interface Props {
  dictionary: string;
}

export const getStaticProps = async (
  context: GetStaticPropsContext<PageUrlParams>
): Promise<GetStaticPropsResult<PageUrlParams>> => {
  const { dictionary } = context.params as PageUrlParams;
  return { props: { dictionary } };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const appConfig = config();
  return {
    fallback: false,
    paths:
      appConfig.dataDictionaries?.map(({ path: dictionary }) => ({
        params: { dictionary },
      })) || [],
  };
};

const Page = ({ dictionary }: Props): JSX.Element => {
  return <DataDictionaryView dictionary={dictionary} />;
};

Page.Main = Main;

export default Page;
