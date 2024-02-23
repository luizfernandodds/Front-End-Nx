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
public class MonitoringRequestDto implements Serializable {

	private static final long serialVersionUID = 4811820165386844912L;
	private Long id;
	private CustomerDto customer;
	private LoginDto login;
	private DriverDto driver;
	private TargetDto targetControl;
	private TargetDto targetReference;
	private GrisDto gris;
	private CostCenterDto costCenter;
	private TransporterDto transporter;
	private LogisticOperatorDto logisticOperator;
	private SemiTrailerDto semiTrailer1;
	private SemiTrailerDto semiTrailer2;
	private SemiTrailerDto semiTrailer3;
	private SynopticDto synoptic;
	private String numberRomaneio;
	private String nameClient;
	private String identifierControl;
	private String identifierReference;
	private LocalDateTime dateCreate;
	private LocalDateTime dateStart;
	private LocalDateTime dateIntended;
	private LocalDateTime dateFinish;
	private LocalDateTime dateChargeStart;
	private LocalDateTime dateChargeFinish;
	private LocalDateTime dateDischargeStart;
	private LocalDateTime dateDischargeFinish;
	private LocalDateTime dateForecastLoaded;
	private LocalDateTime dateForecastDischarge;
	private LocalDateTime dateForecastEmpty;
	private String loadingDescription;
	private String destiny;
	private Integer idRouteExternal;
	private Double loadWeight;
	private String nature;
	private String specie;
	private Double totalValue;
	private Boolean emptyLoaded;
	private Boolean mirrored;
	private String nameGr;
	private LocalDateTime dateDelete;
	private LocalDateTime dateFinishedClient;
	private String reason;
	private Integer origin;
	private LocalDateTime dateUpdate;
	private LoginDto loginUpdate;
	private LoginDto loginDelete;
	private String mobileTrackerNumber;
	private StatusSmDto statusSm;
	private String serial;
	private String equipmentName;
	private Boolean telemonitoring = false;
	private Integer checkpoint;

	//Objeto transiente
//	private List<MonitoringRequestDriver> listMonitoringRequestDriver;
//	private List<TravelPlanDto> listTravelPlan;
//	private List<Escort> listEscort;
//	private List<SemiTrailerDto> listSemiTrailer;
//	private Route route;
//	private List<InterestPointDto> listInterestPoint;
//	private List<MonitoringRequestStatus> listMonitoringRequestStatus;
//	private PositionEvent positionEvent;
//	private String originTravel;

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
		MonitoringRequestDto other = (MonitoringRequestDto) obj;
		return Objects.equals(id, other.id);
	}
	
	
}