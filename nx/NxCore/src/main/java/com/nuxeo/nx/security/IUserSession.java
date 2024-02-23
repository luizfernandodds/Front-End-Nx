package com.nuxeo.nx.security;

import java.util.Date;
import java.util.List;
import java.util.Map;

/**
 * Interface for information change between EBJ project and WEB project about
 * User Permissions and another securities demands
 * 
 */
public interface IUserSession {

  /** String used for split client - user */
  public static final String LOGIN_SEPARATOR = "/";

  /**
   * @return the userName
   */
  public String getUserName();

  /**
   * @param userName
   *          the userName to set
   */
  public void setUserName(String userName);

  /**
   * @return the clientName
   */
  public String getClientName();

  /**
   * @param clientName
   *          the clientName to set
   */
  public void setClientName(String clientName);

  /**
   * @return the roles
   */
  public List<String> getRoles();

  /**
   * @param roles
   *          the roles to set
   */
  public void setRoles(List<String> roles);

  /**
   * @return the funcionalites
   */
  public Map<Integer, Integer> getFuncionalites();

  /**
   * @param funcionalites
   *          the funcionalites to set
   */
  public void setFuncionalites(Map<Integer, Integer> funcionalites);

  /**
   * @param in
   *          the loggin date
   */
  public void setDateIn(Date in);

  /**
   * @return the loggin date
   */
  public Date getDateIn();

  List<Long> getDeviceIds();

  void setDeviceIds(List<Long> deviceIds);

  List<Long> getTargetIds();

  void setTargetIds(List<Long> targetIds);

  Long getUserId();

  void setUserId(Long userId);

  Long getClientId();

  void setClientId(Long clientID);

  /**
   * @return the userLogin
   */
  public String getUserLogin();

  /**
   * @param userLogin
   *          the userLogin to set
   */
  public void setUserLogin(String userLogin);

  /**
   * @return the timeZone
   */
  public Integer getTimezone();

  /**
   * @param timezone
   *          the timeZone to set
   */
  public void setTimezone(Integer timezone);

  /**
   * @return the clientLogin
   */
  public String getClientLogin();

  /**
   * @param clientLogin
   *          the clientLogin to set
   */
  public void setClientLogin(String clientLogin);

  /**
   * @return the fullLogin
   */
  public String getFullLogin();

  /**
   * @param fullLogin
   *          the fullLogin to set
   */
  public void setFullLogin(String fullLogin);

}
