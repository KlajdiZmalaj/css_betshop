window.fetchSportBanners = async (skin, token) => {
  const response = await fetch(
    `https://gradm-api.pcluster.info/api/skin/banners/all?token=${token}&page=home&skin=${skin}`,
    {
      method: "GET",
    }
  );
  const data = await response.json();
  const {
    success: { banners },
  } = data;
  const fieldBg = banners.filter((a) => a.css_selector.name === "fieldbg");
  const mainBanner = banners.filter(
    (a) => a.css_selector.name === "main_banner"
  );
  const leagueBanner = banners.filter((a) => a.css_selector.name === "league");
  const squad1Banner = banners.filter((a) => a.css_selector.name === "squad1");
  const squad2Banner = banners.filter((a) => a.css_selector.name === "squad2");
  const topBanners = banners.filter((a) => a.css_selector.name === "toprow");
  const bottomBanners = banners.filter(
    (a) => a.css_selector.name === "bottomrow"
  );
  console.log("ca ka data ", data, banners, mainBanner);

  if (mainBanner.length === 1) {
    $("#main_banner .title").text(mainBanner[0].title);
    $("#main_banner .subtitle").text(mainBanner[0].subtitle);
    $("#main_banner a").text(mainBanner[0].button);
    $("#main_banner a").on("click", () => {
      window.top.location.href = mainBanner[0].link;
    });
    $("#main_banner img").attr("src", mainBanner[0].image.path);
  }else {
    var templateLeft = `${mainBanner
      .map(
        (banner) =>
          `<div class="sliderItem" onclick="window.top.location.href = '${banner.link}'"><img class="newSliderSlide" src="${
            banner?.image?.path
          }" alt="" /></div>`
      )
      .join("")}`;
    $('#main_banner').html(templateLeft);
    $('#main_banner').slick({
      infinite: true,
      slidesToShow: 1,
      slidesToScroll: 1,
      dots: true,
      autoplay: true,
      autoplaySpeed: 2000,
      arrows: true,
    });
  }
  if (fieldBg[0]) {
    $("#rightField").css("background-image", `url(${fieldBg[0].image.path})`);
    $("#rightField .footer .time").text(fieldBg[0].title);
    $("#rightField .footer .date").text(fieldBg[0].subtitle);
    $("#rightField .footer button").text(fieldBg[0].button);
    $("#rightField").on("click", () => {
      window.top.location.href = fieldBg[0].link;
    });
  }
  if (squad1Banner[0]) {
    $(".squad1 img").attr("src", squad1Banner[0].image.path);
    $(".squad1 span").text(squad1Banner[0].title);
  }
  if (squad2Banner[0]) {
    $(".squad2 img").attr("src", squad2Banner[0].image.path);
    $(".squad2 span").text(squad2Banner[0].title);
  }
  if (leagueBanner[0]) {
    $(".league img").attr("src", leagueBanner[0].image.path);
    $("div[st]").text(leagueBanner[0].title);
    $("div[nd]").text(leagueBanner[0].subtitle);
  }
  function setSliders(bannersGot, element) {
    if (bannersGot.length >= 2) {
      //slider
      var template = `${bannersGot
        .map(
          (banner) =>
            `<div class="sliderItem" onclick="${
              banner.subtitle
                ? `window.top.location.href = 'https://${window.location.host}/casino?token=&language=it&system_code=BETSHOP375&systemCodeLancioGioco=BETSHOP375&codiceGiocoInterno=${banner.subtitle}&codicePiattaforma=1&codiceLancioLive=&isReal=0&ip='`
                : ""
            }"><img class="newSliderSlide" src="${
              banner?.image?.path
            }" alt="" /></div>`
        )
        .join("")}`;
      $(element).html(template);
      $(element).slick({
        infinite: true,
        slidesToShow: 5,
        slidesToScroll: 5,
        dots: false,
        autoplay: true,
        autoplaySpeed: 2000,
        arrows: false,
      });
    }
  }
  setSliders(topBanners, ".slider1");
  setSliders(bottomBanners, ".slider2");
};
$(document).ready(() => {
  window.fetchSportBanners(
    "betshop375",
    "231f3b977a80ca0d697f44afa98016564c9742a823d300ceff169b6905a3a8e969da6fcdcbab39f7"
  );
});
