package com.nuxeo.nx.dto;

import java.io.Serializable;
import java.time.LocalDateTime;
import java.util.Objects;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@ToString
@Getter
@Setter
public class LoginEventSentinelDto implements Serializable {

	private static final long serialVersionUID = -96006830543448303L;
	private Long id;
	private LoginDto login;
	private LocalDateTime dateCreate;
	private LocalDateTime dateDelete;
//    private Set<EventSentinelDto> listEventSentinel;
    
	public LoginEventSentinelDto() {
		
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
		LoginEventSentinelDto other = (LoginEventSentinelDto) obj;
		return Objects.equals(id, other.id);
	}
}
