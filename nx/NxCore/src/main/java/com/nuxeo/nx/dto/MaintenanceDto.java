package com.nuxeo.nx.dto;

import java.io.Serializable;
import java.time.LocalDateTime;
import java.util.Objects;
import java.util.Set;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@ToString
@Getter
@Setter
public class MaintenanceDto implements Serializable {

	private static final long serialVersionUID = 9071435152440471282L;

	public static enum Analysis {
		ANALYSIS_ODOMETER(1, "maintenance_admin_unit_odometer", "Kms"),
		ANALYSIS_HOURMETER(2, "maintenance_admin_unit_hourmeter", "Hs"),
		ANALYSIS_MONTHS(3, "maintenance_admin_unit_month", "Ms");
		private int value;
		private String i18n;
		private String unit;

		Analysis(int value, String i18n, String unit) {
			this.value = value;
			this.i18n = i18n;
			this.unit = unit;
		}

		public int getCode() {
			return this.value;
		}

		public String getI18n() {
			return this.i18n;
		}

		public String getUnit() {
			return this.unit;
		}

		public static Analysis getByCode(int value) {
			for (Analysis analysis : Analysis.values()) {
				if (analysis.getCode() == value)
					return analysis;
			}
			return null;
		}
	}

	private Long id;
	private String name;
	private CustomerDto customer;
	private int analysis;
	private Long value;
	private Integer time;
	private String description;
	private Set<TargetDto> targets;
	private Set<MaintenanceDoneDto> dones;
	private LocalDateTime dateDelete;

	public MaintenanceDto() {
	}

	public MaintenanceDoneDto getDoneByTarget(TargetDto target) {
		if (this.dones != null && target != null) {
			for (MaintenanceDoneDto d : this.dones) {
				if (d.getTarget() != null && d.getTarget().getId() == target.getId())
					return d;
			}
		}
		return null;
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
		MaintenanceDto other = (MaintenanceDto) obj;
		return Objects.equals(id, other.id);
	}
	
	
}