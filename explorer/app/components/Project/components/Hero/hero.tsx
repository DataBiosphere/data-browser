/**
 * Project detail page hero component comprising breadcrumbs, project title, project status and tabs.
 */

// Core dependencies
import React from "react";

// App dependencies
import { Stack } from "app/components/common/Stack/Stack";
import { Status, StatusBadge } from "../../../common/StatusBadge/statusBadge";
import { Title } from "../Title/title";
import { Tabs } from "app/components/Tabs/tabs";
import { useTabController } from "app/components/Tabs/useTabController";

interface Props {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any -- TODO breadcrumb type https://github.com/clevercanary/data-browser/issues/68
  breadcrumbs?: any;
  status?: Status;
  tabs?: string[];
  title?: string;
}

export const Hero = ({
  breadcrumbs,
  status,
  tabs,
  title,
}: Props): JSX.Element => {
  const tabController = useTabController();

  if (tabs && !tabController) {
    throw new Error(`Hero tabs must be used within a TabControllerProvider`);
  }

  return (
    <>
      {(breadcrumbs || title) && (
        <Stack gap={1}>
          {/* TODO project breadcrumbs https://github.com/clevercanary/data-browser/issues/68 */}
          {title && <Title title={title} />}
        </Stack>
      )}
      {status && (
        <Stack direction="row" gap={4}>
          <StatusBadge status={status} />
        </Stack>
      )}
      {tabs && tabController && (
        <Tabs
          onTabChange={tabController.onTabChange}
          selectedTab={tabController.selectedTab}
          tabs={tabs}
        />
      )}
    </>
  );
};
