package com.nuxeo.nx.security;

import java.util.Date;
import java.util.List;
import java.util.Map;

public class UserSession implements IUserSession {
	private Long userId;
	private Long clientId;
	private String userName;
	private String clientName;
	private String clientLogin;
	private String userLogin;
	private Integer timezone;
	private List<String> roles;
	private PROFILE_TYPE profileType;
	private String fullLogin;
	private Map<Integer, Integer> funcionalites;
	private Date in;
	private List<Long> deviceIds;
	private List<Long> targetIds;
	private ThemeSession theme;
	private Integer typeMap;
	private Boolean isMobile;
	private String loginEmail;
	
	
	
	public enum PROFILE_TYPE {
		SYSADMIN(1L), CLIENTADMIN(2L), CLIENT(3L), USER(4L), TREATMENT(5L), CUSTOM(10001L);
		
		private final Long id;

		PROFILE_TYPE(Long id) {
			this.id = id;
		}

		public Long getId() {
			return id;
		}

		public static PROFILE_TYPE getById(Long i) {
			for (PROFILE_TYPE pt : PROFILE_TYPE.values()) {
				if (pt.id == i) {
					return pt;
				}
			}
			throw new IllegalArgumentException("no datatype with " + i + " exists");
		}
	}

	/** {@inheritDoc} */
	@Override
	public String getUserName() {
		return userName;
	}

	/** {@inheritDoc} */
	@Override
	public void setUserName(String userName) {
		this.userName = userName;
	}

	/** {@inheritDoc} */
	@Override
	public String getClientName() {
		return clientName;
	}

	/** {@inheritDoc} */
	@Override
	public void setClientName(String clientName) {
		this.clientName = clientName;
	}

	/** {@inheritDoc} */
	@Override
	public List<String> getRoles() {
		return roles;
	}

	/** {@inheritDoc} */
	@Override
	public void setRoles(List<String> roles) {
		this.roles = roles;
	}

	/** {@inheritDoc} */
	public PROFILE_TYPE getProfileType() {
		return profileType;
	}

	/** {@inheritDoc} */
	public void setProfileType(PROFILE_TYPE profileType) {
		this.profileType = profileType;
	}

	/** {@inheritDoc} */
	public void setProfileType(Long id) {
		this.profileType = PROFILE_TYPE.getById(id);
	}

	/** {@inheritDoc} */
	@Override
	public Map<Integer, Integer> getFuncionalites() {
		return funcionalites;
	}

	/** {@inheritDoc} */
	@Override
	public void setFuncionalites(Map<Integer, Integer> funcionalites) {
		this.funcionalites = funcionalites;
	}

	/** {@inheritDoc} */
	@Override
	public void setDateIn(Date in) {
		this.in = in;

	}

	/** {@inheritDoc} */
	@Override
	public Date getDateIn() {
		return in;
	}


	/** {@inheritDoc} */
	@Override
	public List<Long> getDeviceIds() {
		return deviceIds;
	}

	/** {@inheritDoc} */
	@Override
	public void setDeviceIds(List<Long> deviceIds) {
		this.deviceIds = deviceIds;
	}

	/** {@inheritDoc} */
	@Override
	public List<Long> getTargetIds() {
		return targetIds;
	}

	/** {@inheritDoc} */
	@Override
	public void setTargetIds(List<Long> targetIds) {
		this.targetIds = targetIds;
	}

	/** {@inheritDoc} */
	@Override
	public Long getUserId() {
		return userId;
	}

	/** {@inheritDoc} */
	@Override
	public void setUserId(Long idUser) {
		this.userId = idUser;
	}

	/** {@inheritDoc} */
	@Override
	public Long getClientId() {
		return clientId;
	}

	/** {@inheritDoc} */
	@Override
	public void setClientId(Long idClient) {
		this.clientId = idClient;
	}

	/** {@inheritDoc} */
	@Override
	public String getUserLogin() {
		return userLogin;
	}

	/** {@inheritDoc} */
	@Override
	public void setUserLogin(String userLogin) {
		this.userLogin = userLogin;
	}

	/** {@inheritDoc} */
	@Override
	public Integer getTimezone() {
		return timezone;
	}

	/** {@inheritDoc} */
	@Override
	public void setTimezone(Integer timezone) {
		this.timezone = timezone;
	}

	/** {@inheritDoc} */
	@Override
	public String getClientLogin() {
		return clientLogin;
	}

	/** {@inheritDoc} */
	@Override
	public void setClientLogin(String clientLogin) {
		this.clientLogin = clientLogin;
	}

	/** {@inheritDoc} */
	@Override
	public String getFullLogin() {
		return fullLogin;
	}

	/** {@inheritDoc} */
	@Override
	public void setFullLogin(String fullLogin) {
		this.fullLogin = fullLogin;
	}

	public ThemeSession getTheme() {
		return theme;
	}

	public void setTheme(ThemeSession theme) {
		this.theme = theme;
	}

	public Integer getTypeMap() {
		return typeMap;
	}

	public void setTypeMap(Integer typeMap) {
		this.typeMap = typeMap;
	}
	
	public Boolean getIsMobile() {
		return isMobile;
	}

	public void setIsMobile(Boolean isMobile) {
		this.isMobile = isMobile;
	}
	

	public String getLoginEmail() {
		return loginEmail;
	}

	public void setLoginEmail(String loginEmail) {
		this.loginEmail = loginEmail;
	}

	/** {@inheritDoc} */
	@Override
	public String toString() {
		return "UserSession [userId=" + userId + ", clientId=" + clientId + ", userName=" + userName + ", clientName="
				+ clientName + ", clientLogin=" + clientLogin + ", userLogin=" + userLogin + ", roles=" + roles
				+ ", fullLogin=" + fullLogin + ", funcionalites=" + funcionalites + ", in=" + in + ","
				+ " deviceIds=" + deviceIds + ", targetIds=" + targetIds + "]";
	}

}
