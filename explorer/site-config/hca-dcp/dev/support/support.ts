import {
  ComponentConfig,
  SupportConfig,
} from "@clevercanary/data-explorer-ui/lib/config/entities";
import * as C from "app/components";

const ZENDESK_REQUEST = "https://support.terra.bio/api/v2/requests.json";
const ZENDESK_UPLOAD = "https://support.terra.bio/api/v2/uploads";

export const supportConfig: SupportConfig = {
  supportRequest: {
    components: [
      {
        component: C.SupportRequest,
        props: {
          SupportRequestForm: C.SupportRequestForm,
          SupportRequestSubmitted: C.SupportRequestSubmitted,
        },
      } as ComponentConfig<typeof C.SupportRequest>,
    ],
    requestURL: ZENDESK_REQUEST,
    uploadURL: ZENDESK_UPLOAD,
  },
};
