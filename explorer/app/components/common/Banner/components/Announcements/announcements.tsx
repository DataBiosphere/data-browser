import { useSessionTimeout } from "@databiosphere/findable-ui/lib/hooks/useSessionTimeout";
import { useSystemStatus } from "@databiosphere/findable-ui/lib/hooks/useSystemStatus";
import { ElementType, Fragment } from "react";
import { SessionTimeout } from "./components/SessionTimeout/sessionTimeout";
import { SystemIndexing as SystemIndexingBanner } from "./components/SystemIndexing/systemIndexing";
import { SystemStatus as SystemStatusBanner } from "./components/SystemStatus/systemStatus";

interface AnnouncementsProps {
  GeneralAnnouncement?: ElementType;
  SystemIndexing?: ElementType;
  SystemStatus?: ElementType;
}

export const Announcements = ({
  GeneralAnnouncement,
  SystemIndexing = SystemIndexingBanner,
  SystemStatus = SystemStatusBanner,
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
        <SessionTimeout onClose={clearSessionTimeout} />
      ) : isSystemUnavailable ? (
        <SystemStatus />
      ) : isSystemIndexing ? (
        <SystemIndexing />
      ) : (
        GeneralAnnouncement && <GeneralAnnouncement />
      )}
    </Fragment>
  );
};
