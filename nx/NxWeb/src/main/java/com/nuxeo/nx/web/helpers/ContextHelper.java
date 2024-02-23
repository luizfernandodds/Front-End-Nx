package com.nuxeo.nx.web.helpers;

import java.util.ResourceBundle;

import jakarta.faces.context.FacesContext;
import jakarta.servlet.http.HttpServletRequest;

import com.nuxeo.nx.security.UserSession;

public class ContextHelper {
  public final static String USER_SESSION_NAME = "loginSession";

  // A variavel abaixo corresponde ao mapeamento das mensagens
  // no JSF. Se houve mudanca e necessario alterar essa variavel
  public final static String BUNDLE_NAME = "msg";

  private static FacesContext facesContext() {
    return FacesContext.getCurrentInstance();
  }

  private static HttpServletRequest request() {
    return (HttpServletRequest) facesContext().getExternalContext()
        .getRequest();
  }

  /**
   * Save any object in session with name key
   * 
   * @param name
   *          key
   * @param object
   */
  public static void saveSessionObject(String name, Object object) {
    facesContext().getExternalContext().getSessionMap().put(name, object);
  }

  /**
   * Returns object saved in session with name key
   * 
   * @param name
   *          key
   * @return {@link Object}
   */
  public static Object getSessionObject(String name) {
    if (!facesContext().getExternalContext().getSessionMap().containsKey(name))
      return null;

    return facesContext().getExternalContext().getSessionMap().get(name);
  }

  /**
   * Return the FacesContext
   * 
   * @return the {@link FacesContext}
   */
  public static FacesContext getFacesContext() {
    return facesContext();
  }

  /**
   * Return External Context from Http
   * 
   * @return {@link HttpServletRequest} External Context from Http
   */
  public static HttpServletRequest getRequest() {
    return request();
  }

  /**
   * Returns the Login stored in session
   * 
   * @return {@link UserSession} stored in session or <code>null</code> if
   *         there's no object in session
   */
  public static UserSession getSessionInfo() {
    return (UserSession) getSessionObject(USER_SESSION_NAME);
  }

  /**
   * Returns the based locale message
   * 
   * @param msg
   *          String from the properties file
   * @return locale property message
   */
  public static String getResourceMsg(String msg) {
    try {
      ResourceBundle bundle = facesContext().getApplication()
          .getResourceBundle(facesContext(), BUNDLE_NAME);
      String message = bundle.getString(msg);

      return message;
    } catch (Exception e) {
      e.printStackTrace();
    }

    return msg;
  }

  /**
   * Get domain address
   * 
   * @return domain address
   */
  public static String getServerDomain() {
    return request().getServerName();
  }
}
