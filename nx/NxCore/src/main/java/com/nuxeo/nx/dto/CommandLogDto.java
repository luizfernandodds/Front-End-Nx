package com.nuxeo.nx.dto;

import java.io.Serializable;

import lombok.Getter;
import lombok.Setter;
import java.text.SimpleDateFormat;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
public class CommandLogDto implements Serializable {

	private static final long serialVersionUID = -277927465338339134L;
	private Long id;
	private CommandDto command;
	private DeviceDto device;
	private Long loginId;
	private LocalDateTime date;
	private String description;
	private String parameter;
	private String strCommand;
	private Boolean pending = true;
	private List<CommandStatusDto> listCommandStatus = new ArrayList<>();
	private String statusSent;
	private LocalDateTime dateSent;
	private String lastStatus;
	private LocalDateTime dateLastSent;
	private String commandName;
	private LoginDto login;

	public CommandLogDto() {
	}

	public CommandLogDto(Long id) {
		this.setId(id);
	}

	public CommandLogDto(Long id, boolean pending) {
		this.setId(id);
		this.pending = pending;
	}

	public CommandLogDto(CommandDto cmd, DeviceDto dev) {
		this.setCommand(cmd);
		this.setDevice(dev);
	}

	public String getFormatDateSent() {
		SimpleDateFormat formatter = new SimpleDateFormat("dd/MM/yyyy HH:mm:ss");
		return formatter.format(this.dateSent);
	}

	public String getFormatDateLastStatus() {
		SimpleDateFormat formatter = new SimpleDateFormat("dd/MM/yyyy HH:mm:ss");
		return formatter.format(this.dateLastSent);
	}

	@Override
	public String toString() {
		return "CommandLog [id=" + id + ", command=" + command + ", device=" + device + ", description=" + description
				+ ", parameter=" + parameter + "]";
	}

}