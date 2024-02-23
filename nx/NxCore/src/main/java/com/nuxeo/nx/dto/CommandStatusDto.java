package com.nuxeo.nx.dto;

import java.io.Serializable;
import java.util.Date;
import java.util.Objects;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

/**
 * The persistent class for the command_status database table.
 * 
 */
@ToString
@Getter
@Setter
public class CommandStatusDto implements Serializable {

	private static final long serialVersionUID = -4762425232472460127L;
	private Long id;
	private Date date;
	private CommandLogDto commandLog;
	private CommandStatusTypeDto commandStatusType;

	public CommandStatusDto() {
	}

	public CommandStatusDto(CommandLogDto cml, CommandStatusTypeDto cst) {
		this.setCommandLog(cml);
		this.setCommandStatusType(cst);
	}

	public void setCommandLog(CommandLogDto commandLog) {
		this.commandLog = commandLog;
	}

	public void setCommandStatusType(CommandStatusTypeDto commandStatusType) {
		this.commandStatusType = commandStatusType;
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
		CommandStatusDto other = (CommandStatusDto) obj;
		return Objects.equals(id, other.id);
	}
}