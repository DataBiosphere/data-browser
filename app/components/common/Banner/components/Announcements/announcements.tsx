import { Banner } from "@databiosphere/findable-ui/lib/components/common/Banner/banner";
import { useSessionTimeout } from "@databiosphere/findable-ui/lib/hooks/useSessionTimeout";
import { useSystemStatus } from "@databiosphere/findable-ui/lib/hooks/useSystemStatus";
import { Fragment, ReactNode } from "react";

interface AnnouncementsProps {
  generalAnnouncement: ReactNode;
}

export const Announcements = ({
  generalAnnouncement,
}: AnnouncementsProps): JSX.Element => {
  const sessionTimeout = useSessionTimeout();
  const systemStatus = useSystemStatus();
  const { clearSessionTimeout, isSessionTimeout } = sessionTimeout;
  const { indexing, loading, ok } = systemStatus;
  const isSystemUnavailable = !loading && !ok;
  const isSystemIndexing = !loading && ok && indexing;
  return (
    <Fragment>
      {isSessionTimeout ? (
        <Banner onClose={clearSessionTimeout}>
          For your security, you have been logged out due to 15 minutes of
          inactivity.
        </Banner>
      ) : isSystemUnavailable ? (
        <Banner>
          One or more of the system components are currently unavailable.
          Functionality may be degraded.
        </Banner>
      ) : isSystemIndexing ? (
        <Banner>
          Data indexing in progress. Downloads and exports are disabled as
          search results may be incomplete.
        </Banner>
      ) : (
        generalAnnouncement
      )}
    </Fragment>
  );
};
