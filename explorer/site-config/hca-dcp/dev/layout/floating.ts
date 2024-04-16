import { REQUEST_FIELD_ID } from "@databiosphere/findable-ui/lib/components/Support/components/SupportRequest/components/SupportRequestForm/common/entities";
import {
  ComponentConfig,
  FloatingConfig,
} from "@databiosphere/findable-ui/lib/config/entities";
import * as C from "app/components";
import * as V from "../../../../app/viewModelBuilders/azul/hca-dcp/common/viewModelBuilders";

const ZENDESK_FIELD_ID: Record<REQUEST_FIELD_ID, number> = {
  DESCRIPTION: 360007369412,
  EMAIL: 360012782111,
  SUBJECT: 360007369392,
  TICKET_FORM_ID: 360000932232,
  TYPE: 360012744452,
};
const ZENDESK_REQUEST_URL = "https://support.terra.bio/api/v2/requests.json";
const ZENDESK_UPLOAD_URL = "https://support.terra.bio/api/v2/uploads";

export const floating: FloatingConfig = {
  components: [
    {
      component: C.CookieBanner,
      viewBuilder: V.buildCookieBanner,
    } as ComponentConfig<typeof C.CookieBanner>,
    {
      component: C.SupportRequest,
      props: {
        supportRequest: {
          FIELD_ID: ZENDESK_FIELD_ID,
          requestURL: ZENDESK_REQUEST_URL,
          uploadURL: ZENDESK_UPLOAD_URL,
        },
      },
    } as ComponentConfig<typeof C.SupportRequest>,
  ],
};
