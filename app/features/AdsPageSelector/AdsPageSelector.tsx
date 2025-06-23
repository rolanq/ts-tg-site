import React, { useState } from "react";
import SearchAdsList from "../SearchAdsList/SearchAdsList";
import styles from "./AdsPageSelector.module.css";
import NotificationsList from "../NotificationsList/NotificationsList";
import CustomSegmentControl from "@/app/shared/kit/CustomSegment/CustomSegmentControl";

enum Tab {
  Search = "Поиск объявлений",
  Notifications = "Уведомления",
}

export default function AdsPageSelector() {
  const [selectedTab, setSelectedTab] = useState<Tab>(Tab.Search);

  return (
    <>
      <div className={styles.selectorWrapper}>
        <CustomSegmentControl
          options={Object.values(Tab)}
          selectedOption={selectedTab}
          onSelect={(option) => setSelectedTab(option as Tab)}
        />
      </div>
      {selectedTab === Tab.Search && <SearchAdsList />}
      {selectedTab === Tab.Notifications && <NotificationsList />}
    </>
  );
}
