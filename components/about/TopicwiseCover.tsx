import React from "react";
import {
  IconAdjustmentsBolt,
  IconCloud,
  IconCurrencyDollar,
  IconEaseInOut,
  IconHeart,
  IconHelp,
  IconRouteAltLeft,
  IconTerminal2,
} from "@tabler/icons-react";
import FeaturesSection from "../ui/feature-section";

type Props = {
  topics: {
    title: string;
    topicList: { title: string; description: string; icon: string }[];
  }[];
};

export default function TopicwiseCover({ topics }: Props) {
 
  return (
    <div className="mt-20 ml-20 space-y-10">
      <p className="text-5xl font-extrabold mb-10 text-center">
        Topics We Cover
      </p>
      {topics.map((e, i) => (
        <div
          key={i}
          className="flex flex-col lg:flex-row items-start lg:items-center p-6 rounded-lg "
        >
          <p className="text-2xl font-semibold self-center  border-b-2 lg:border-none  px-3 rounded mb-4 lg:mb-0 lg:mr-6">
            {e.title}
          </p>
          <div className="flex-1">
            <FeaturesSection features={e.topicList} />
          </div>
        </div>
      ))}
    </div>
  );
}
