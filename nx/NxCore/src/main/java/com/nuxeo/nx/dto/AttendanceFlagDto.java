package com.nuxeo.nx.dto;

import java.io.Serializable;
import java.time.LocalDateTime;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@ToString
@Getter
@Setter
public class AttendanceFlagDto implements Serializable {

	private static final long serialVersionUID = 2295142334810987704L;
	
	private Long id;
	private Boolean recovered = false;
	private Boolean recoveredTrailer = false;
	private Boolean recoveredTruck = false;
	private Boolean recoveredPrf = false;
	private Boolean recoveredR = false;
	private Boolean armedRobbery = false;
	private Boolean surrenderedStateGas = false;
	private Boolean surrenderedRoad = false;
	private Boolean hostageDriver = false;
	private Boolean previouslyDeviation = false;
	private Boolean contactDriver = false;
	private Boolean informedResponsible = false;
	private Boolean policePowered = false;
	private Boolean readyAnswer = false;
	private Boolean partVehicleRoute = false;
	private Boolean triggeredLock = false;
	private Boolean placeLoadingUnloading = false;
	private Boolean fuelStation = false;
	private Boolean normalizedVoltage = false;
	private Boolean respectedWarning = false;
	private Boolean allowedResponsible = false;
	private Boolean vehicleRoute = false;
	private Boolean block = false;
	private Boolean siren = false;
	private Boolean signalRequest = false;
	private Boolean permittedLocation = false;
	private Boolean boardingMacroChange = false;
	private Boolean soundingSiren = false;
	private Boolean flashingOn = false;
	private Boolean macroReceived = false;
	private Boolean macroSent = false;
	private Boolean blockSent = false;
	private Boolean resetSent = false;
	private Boolean cargoTipping = false;
	private Boolean spoutOpening = false;
	private Boolean totalPressureDrop = false;
	private Boolean partialPressureDrop = false;
	private Boolean injuredDriver = false;
	private Boolean flammableCharge = false;
	private Boolean toxicLoad = false;
	private LocalDateTime dateCreate;

	public AttendanceFlagDto() {
	}

	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + ((id == null) ? 0 : id.hashCode());
		return result;
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		AttendanceFlagDto other = (AttendanceFlagDto) obj;
		if (id == null) {
			if (other.id != null)
				return false;
		} else if (!id.equals(other.id))
			return false;
		return true;
	}
}