package com.nuxeo.nx.security;

public class ThemeSession {
  private String title;
  private String imgMenu;
  private String imgLogo;
  private String imgFavicon;
  private String imgReport;
  private String imgLoading;
  private String imgVersion;

  public ThemeSession() {
    this.title = "";
    this.imgMenu = "/resources/images/menu/ikonn_menu.png";
    this.imgLogo = "/resources/images/logo/g10_200.png";
    this.imgFavicon = "/resources/images/g10_favicon.ico";
    this.imgReport = "/resources/images/logo/g10_200.png";
    this.imgVersion = "/resources/images/layout/g10_logo.png";
    this.imgLoading = "/resources/images/layout/atlas_loading.gif";
  }

  public ThemeSession(String title, String imgMenu, String imgLogo,
      String imgFavicon, String imgReport, String imgLoading, String imgVersion) {
    this.title = title == null ? "" : title;
    this.imgMenu = imgMenu == null ? "/resources/images/menu/ikonn_menu.png"
        : imgMenu;
    this.imgLogo = imgLogo == null ? "/resources/images/logo/g10_200.png"
        : imgLogo;
    this.imgFavicon = imgFavicon == null ? "/resources/images/g10_favicon.ico"
        : imgFavicon;
    this.imgReport = imgReport == null ? "/resources/images/logo/g10_200.png"
        : imgReport;
    this.imgVersion = imgVersion == null ? "/resources/images/layout/g10_logo.png"
        : imgVersion;
    this.imgLoading = imgLoading == null ? "/resources/images/layout/atlas_loading.gif"
        : imgLoading;
  }

  public String getTitle() {
    return title;
  }

  public String getImgMenu() {
    return imgMenu;
  }

  public String getImgLogo() {
    return imgLogo;
  }

  public String getImgFavicon() {
    return imgFavicon;
  }

  public String getImgReport() {
    return imgReport;
  }

  public String getImgLoading() {
    return imgLoading;
  }

  public String getImgVersion() {
    return imgVersion;
  }

  @Override
  public String toString() {
    return "ThemeSession [title=" + title + ", imgMenu=" + imgMenu
        + ", imgLogo=" + imgLogo + ", imgFavicon=" + imgFavicon
        + ", imgReport=" + imgReport + ", imgLoading=" + imgLoading
        + ", imgVersion=" + imgVersion + "]";
  }
}
