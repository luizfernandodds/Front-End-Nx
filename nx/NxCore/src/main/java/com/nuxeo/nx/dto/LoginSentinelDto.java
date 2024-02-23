package com.nuxeo.nx.dto;

import java.io.Serializable;
import java.util.Objects;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@ToString
@Getter
@Setter
public class LoginSentinelDto implements Serializable {
	
	private static final long serialVersionUID = 2092031656576386127L;
	private Long id;
	private LoginEventSentinelDto loginEventSentinel;
	private EventSentinelDto eventSentinel;
	
	public LoginSentinelDto() {
		
	}

	@Override
	public int hashCode() {
		return Objects.hash(id);
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		LoginSentinelDto other = (LoginSentinelDto) obj;
		return Objects.equals(id, other.id);
	}
}
