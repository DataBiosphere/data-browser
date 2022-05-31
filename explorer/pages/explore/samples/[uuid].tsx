import React from "react";
import { Page } from "../../../app/components/Page/Page";
import { DetailViewModel } from "../../../app/models/viewModels";
import { DetailContainer } from "../../../app/entity/detail/DetailContainer";

const SamplesDetailPage = (props: DetailViewModel): JSX.Element => {
  return (
    <Page>
      <DetailContainer {...props} />
    </Page>
  );
};

export default SamplesDetailPage;
