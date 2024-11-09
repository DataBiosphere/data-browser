import { BetaAnnouncement as GeneralAnnouncement } from "../../../../../MDXContent/anvil-cmg";
import { Banner } from "./betaAnnouncement.styles";

export const BetaAnnouncement = ({ ...props }): JSX.Element => {
  return (
    <Banner {...props}>
      <GeneralAnnouncement />
    </Banner>
  );
};
