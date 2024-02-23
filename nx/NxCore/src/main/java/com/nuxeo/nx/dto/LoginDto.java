package com.nuxeo.nx.dto;

import java.io.Serializable;
import java.time.LocalDateTime;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

/**
 * The persistent class for the login database table.
 * 
 */
@Getter
@Setter
@ToString
public class LoginDto implements Serializable {

	private static final long serialVersionUID = 3876628380622611695L;
	private Long id;
	private OwnerDto owner;
	private LocalDateTime dateDelete;
	private LocalDateTime dateCreate;
	private String email;
	private LocalDateTime dateLastLogin;
	private String login;
	private String name;
	private Boolean passChange;
	private String password;
	private String recovery;
	private String address;
	private Integer timezone;
	private String gridConfig;
	private boolean online;
	private LoginTypeDto loginType;
	private CustomerDto customer;
	private ProfileDto profile;
//	private Set<EventDto> events;
//	private Set<RoleDto> roles;
//	private List<TargetDto> targets;

	public LoginDto() {
	}

	public LoginDto(Long id) {
		this.id = id;
	}

	public void setOwner(OwnerDto owner) {
		this.owner = owner;
		this.id = owner.getId();
	}

	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + ((id == null) ? 0 : id.hashCode());
		return result;
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		LoginDto other = (LoginDto) obj;
		if (id == null) {
			if (other.id != null)
				return false;
		} else if (!id.equals(other.id))
			return false;
		return true;
	}

}