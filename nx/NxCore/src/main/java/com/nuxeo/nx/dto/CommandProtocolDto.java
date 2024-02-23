package com.nuxeo.nx.dto;

import java.io.Serializable;
import java.util.Objects;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

/**
 * The persistent class for the command_protocol database table.
 * 
 */
@ToString
@Getter
@Setter
public class CommandProtocolDto implements Serializable {

	private static final long serialVersionUID = 4871528172854121911L;
	private Long id;
	private CommandDto command;
	private ProtocolDto protocol;

	public CommandProtocolDto() {
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
		CommandProtocolDto other = (CommandProtocolDto) obj;
		return Objects.equals(id, other.id);
	}
	
	
}