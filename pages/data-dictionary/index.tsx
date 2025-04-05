import { DataDictionaryView } from "@databiosphere/findable-ui/lib/views/DataDictionaryView/dataDictionaryView";
import { Main } from "@databiosphere/findable-ui/lib/components/Layout/components/ContentLayout/components/Main/main";

const Page = (): JSX.Element => {
  return <DataDictionaryView />;
};

Page.Main = Main;

export default Page;
