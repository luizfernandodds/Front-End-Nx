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
public class IscaDto implements Serializable {
	
	private static final long serialVersionUID = -6846055490083961053L;
	
	private Long id;
	private MonitoringRequestDto monitoringRequest;
	private String number;  
	private String provider;  
	private String client; 
	private String login;  
	private String password;  
	private String installationLocale;  
	private LocalDateTime dateCreate;
	private LocalDateTime dateDelete;
	
	
	public IscaDto() {
		
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
		IscaDto other = (IscaDto) obj;
		return Objects.equals(id, other.id);
	}
}
