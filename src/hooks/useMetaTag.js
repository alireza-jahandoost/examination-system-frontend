import { useContext, useMemo } from "react";
import { MetaTagsContext } from "../contexts/meta-tags-context/meta-tags.context";

const useMetaTags = (newMetaTags) => {
  const { changeMetaData } = useContext(MetaTagsContext);
  useMemo(() => {
    changeMetaData(newMetaTags);
  }, [newMetaTags, changeMetaData]);
};

export default useMetaTags;
