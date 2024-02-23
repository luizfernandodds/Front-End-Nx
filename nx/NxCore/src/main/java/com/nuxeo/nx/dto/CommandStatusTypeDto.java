package com.nuxeo.nx.dto;

import java.io.Serializable;
import java.util.Objects;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

/**
 * The persistent class for the command_status_type database table.
 * 
 */
@ToString
@Getter
@Setter
public class CommandStatusTypeDto implements Serializable {
	private static final long serialVersionUID = 1L;

	// a aplicacao precisa conhecer os status, por isso estao mapeados aqui

	/** Command has sent to queue: 1 */
	public static final long COMMAND_STATUS_TYPE_SEND = 1;

	/** Command has sent to device: 2 */
	public static final long COMMAND_STATUS_TYPE_SENDING = 2;

	/** Command was accept by the device: 3 */
	public static final long COMMAND_STATUS_TYPE_SENT = 3;

	/** Command was canceled by user: 4 */
	public static final long COMMAND_STATUS_TYPE_CANCEL = 4;

	/** Time to send the command was expired: 5 */
	public static final long COMMAND_STATUS_TYPE_EXPIRED = 5;

	/** Number of attempts to send the command was reached: 6 */
	public static final long COMMAND_STATUS_TYPE_ATTEMPTS_REACHED = 6;

	/** The server send timeout because the device didn't answer: 7 */
	public static final long COMMAND_STATUS_TYPE_TIMEOUT = 7;

	/** The device send a not acknowledgment for the command: 8 */
	public static final long COMMAND_STATUS_TYPE_NACK = 8;

	private Long id;
	private String i18n;
	private String name;

	public CommandStatusTypeDto() {
	}

	public CommandStatusTypeDto(Long id) {
		this.setId(id);
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
		CommandStatusTypeDto other = (CommandStatusTypeDto) obj;
		return Objects.equals(id, other.id);
	}
	
	
}