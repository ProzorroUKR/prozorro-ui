import { addons } from "storybook/manager-api";

addons.register("TitleAddon", api => {
  const PAGE_TITLE = "Prozorro UI";

  const setTitle = (): void => {
    let storyData = null;

    try {
      storyData = api.getCurrentStoryData();
    } catch (e) {
      console.error(e);
    }

    document.title = storyData?.title
      ? `${storyData.title.replace(/\//g, " / ")} - ${storyData.name} ⋅ ${PAGE_TITLE}`
      : PAGE_TITLE;
  };

  return new MutationObserver(() => {
    if (document.title.endsWith("Storybook")) {
      setTitle();
    }
  }).observe(document.querySelector("title") as HTMLElement, {
    childList: true,
    subtree: true,
    characterData: true,
  });
});
