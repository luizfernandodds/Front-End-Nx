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
public class CommandTypeIntegrationDto implements Serializable {
	private static final long serialVersionUID = 1L;

	private Long id;
	private String name;
	private ProtocolDto protocol;
	private String message;
	private LoginDto login;
	private LocalDateTime dateCreate;
	private LocalDateTime dateDelete;
	
	@Override
	public int hashCode() {
		return Objects.hash(dateCreate, dateDelete, id, login, message, name, protocol);
	}
	
	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		CommandTypeIntegrationDto other = (CommandTypeIntegrationDto) obj;
		return Objects.equals(dateCreate, other.dateCreate) && Objects.equals(dateDelete, other.dateDelete)
				&& Objects.equals(id, other.id) && Objects.equals(login, other.login)
				&& Objects.equals(message, other.message) && Objects.equals(name, other.name)
				&& Objects.equals(protocol, other.protocol);
	}

	
}