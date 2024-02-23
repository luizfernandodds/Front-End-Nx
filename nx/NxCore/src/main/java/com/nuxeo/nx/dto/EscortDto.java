package com.nuxeo.nx.dto;

import java.io.Serializable;
import java.time.LocalDateTime;

import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@EqualsAndHashCode
@ToString
@Getter
@Setter
public class EscortDto implements Serializable {
	
	private static final long serialVersionUID = 4532875319305273689L;
	
	private Long id;
	private SecurityCompanyDto securityCompany;
	private MonitoringRequestDto monitoringRequest;
	private TypeTrackerDto typeTracker;
	private String car; //VIATURA
	private String cell; //CELULAR
	private String nextel; //NEXTEL
	private String vigilant; //VIGILANTE
	private String numberTracker; //N�mero Rastreador
	private String orderService; //Ordem de Servi�o
	private LocalDateTime dateCreate;
	private LocalDateTime dateDelete;
	
	public EscortDto() {
		
	}

}
