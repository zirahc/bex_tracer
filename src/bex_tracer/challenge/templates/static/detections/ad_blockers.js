const BAIT_CLASSES = [
  "pub_300x250",
  "pub_300x250m",
  "pub_728x90",
  "text-ad",
  "textAd",
  "text-ad-links",
  "ad-unit",
  "adv-mpu",
  "stickyads",
  "ads_banner",
  "AdBox",
  "text-ad-top",
].join(" ");

const BAIT_STYLE = [
  "width: 1px !important",
  "height: 1px !important",
  "position: absolute !important",
  "left: -10000px !important",
  "top: -1000px !important",
].join("; ");

const NAMES = [
  "uBlock Origin Lite",
  "Adblock Plus - free ad blocker",
  "AdGuard AdBlocker",
  "AdBlocker Ultimate",
  "Adblock for Youtube",
  "Pie Adblock - A Powerful Free Ad Blocker",
  "Privacy Badger",
  "I don't care about cookies",
  "SponsorBlock",
];

function wait(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

function imageLoads(url, timeoutMs) {
  return new Promise((resolve) => {
    const img = new Image();
    let settled = false;
    const finish = (loaded) => {
      if (settled) {
        return;
      }
      settled = true;
      img.onload = null;
      img.onerror = null;
      resolve(loaded);
    };
    img.onload = () => finish(true);
    img.onerror = () => finish(false);
    setTimeout(() => finish(false), timeoutMs);
    const sep = url.includes("?") ? "&" : "?";
    img.src = url + sep + "rn=" + Math.random();
  });
}

async function function1() {
  const parent = document.body || document.documentElement;
  const bait = document.createElement("div");
  bait.className = BAIT_CLASSES;
  bait.setAttribute("style", BAIT_STYLE);
  parent.appendChild(bait);
  await wait(100);
  const collapsed = bait.offsetHeight === 0;
  bait.remove();
  return collapsed;
}

async function function2() {
  return imageLoads("https://ad-delivery.net/px.gif?ch=1", 1500);
}

async function detect_ad_blockers() {
  const cosmetic = await function1();
  const acceptableAds = await function2();
  const answers = {};
  for (const name of NAMES) {
    answers[name] = false;
  }
  if (cosmetic && acceptableAds) {
    answers["Adblock Plus - free ad blocker"] = true;
  }
  return answers;
}

if (typeof window !== 'undefined') window.detect_ad_blockers = detect_ad_blockers;
