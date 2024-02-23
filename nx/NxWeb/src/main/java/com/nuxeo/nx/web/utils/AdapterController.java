package com.nuxeo.nx.web.utils;

import java.net.URLEncoder;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import org.primefaces.model.map.Circle;
import org.primefaces.model.map.LatLng;
import org.primefaces.model.map.Polyline;
import io.leonard.PolylineUtils;
import io.leonard.Position;
import com.nuxeo.nx.dto.DeviceDto;
import com.nuxeo.nx.dto.DevicePeripheralDto;
import com.nuxeo.nx.dto.PeripheralDto;
import com.nuxeo.nx.entity.Geometry;
import com.nuxeo.nx.model.PeripheralInputOutput;
import com.nuxeo.nx.utils.DateUtilConverter;

public class AdapterController {

	public Set<DevicePeripheralDto> setPeripheral(PeripheralInputOutput peripheralInputOutput, DeviceDto device) {
		Set<DevicePeripheralDto> listDevicePeripheral = new HashSet<>();
		DevicePeripheralDto dp = null;
		PeripheralDto peripheral = null;

		if (peripheralInputOutput != null) {
			// Entradas
			if (peripheralInputOutput.getInput1() != null) {
				peripheral = new PeripheralDto();
				dp = new DevicePeripheralDto();
				peripheral.setId(peripheralInputOutput.getInput1());
				dp.setDevice(device);
				dp.setPeripheral(peripheral);
				dp.setInput(1);

				listDevicePeripheral.add(dp);
			}
			if (peripheralInputOutput.getInput2() != null) {
				peripheral = new PeripheralDto();
				dp = new DevicePeripheralDto();
				dp.setDevice(device);
				peripheral.setId(peripheralInputOutput.getInput2());
				dp.setPeripheral(peripheral);
				dp.setInput(2);
				listDevicePeripheral.add(dp);
			}
			if (peripheralInputOutput.getInput3() != null) {
				peripheral = new PeripheralDto();
				dp = new DevicePeripheralDto();
				dp.setDevice(device);
				peripheral.setId(peripheralInputOutput.getInput3());
				dp.setPeripheral(peripheral);
				dp.setInput(3);
				listDevicePeripheral.add(dp);
			}
			if (peripheralInputOutput.getInput4() != null) {
				peripheral = new PeripheralDto();
				dp = new DevicePeripheralDto();
				dp.setDevice(device);
				peripheral.setId(peripheralInputOutput.getInput4());
				dp.setPeripheral(peripheral);
				dp.setInput(4);
				listDevicePeripheral.add(dp);
			}

			// Saidas
			if (peripheralInputOutput.getOutput1() != null) {
				peripheral = new PeripheralDto();
				dp = new DevicePeripheralDto();
				dp.setDevice(device);
				peripheral.setId(peripheralInputOutput.getOutput1());
				dp.setPeripheral(peripheral);
				dp.setOutput(1);

				listDevicePeripheral.add(dp);
			}
			if (peripheralInputOutput.getOutput2() != null) {
				peripheral = new PeripheralDto();
				dp = new DevicePeripheralDto();
				dp.setDevice(device);
				peripheral.setId(peripheralInputOutput.getOutput2());
				dp.setPeripheral(peripheral);
				dp.setOutput(2);

				listDevicePeripheral.add(dp);
			}
			if (peripheralInputOutput.getOutput3() != null) {
				peripheral = new PeripheralDto();
				dp = new DevicePeripheralDto();
				dp.setDevice(device);
				peripheral.setId(peripheralInputOutput.getOutput3());
				dp.setPeripheral(peripheral);
				dp.setOutput(3);
				listDevicePeripheral.add(dp);
			}
			if (peripheralInputOutput.getOutput4() != null) {
				peripheral = new PeripheralDto();
				dp = new DevicePeripheralDto();
				dp.setDevice(device);
				peripheral.setId(peripheralInputOutput.getOutput4());
				dp.setPeripheral(peripheral);
				dp.setOutput(4);
				listDevicePeripheral.add(dp);
			}
		}

		return listDevicePeripheral;
	}

	public PeripheralInputOutput setPeripheralInputOutput(List<DevicePeripheralDto> listDp) {
		PeripheralInputOutput peripheralInputOutput = new PeripheralInputOutput();
		for (DevicePeripheralDto dp : listDp) {
			if(dp.getInput()!=null) {
				switch (dp.getInput()) {
				case 1:
					peripheralInputOutput.setInput1(dp.getPeripheral().getId());
					break;
				case 2:
					peripheralInputOutput.setInput2(dp.getPeripheral().getId());
					break;
				case 3:
					peripheralInputOutput.setInput3(dp.getPeripheral().getId());
					break;
				case 4:
					peripheralInputOutput.setInput4(dp.getPeripheral().getId());
					break;
				}
			}
			
			if(dp.getOutput()!=null) {
				switch (dp.getOutput()) {
				case 1:
					peripheralInputOutput.setOutput1(dp.getPeripheral().getId());
					break;
				case 2:
					peripheralInputOutput.setOutput2(dp.getPeripheral().getId());
					break;
				case 3:
					peripheralInputOutput.setOutput3(dp.getPeripheral().getId());
					break;
				case 4:
					peripheralInputOutput.setOutput4(dp.getPeripheral().getId());
					break;
				}
			}
		}
		return peripheralInputOutput;
	}
	
	public String tranformGeoJson(String wkt, String bounds) {
		String points = null;
		StringBuilder sb = new StringBuilder();
		
		points = wkt.replace("LINESTRING", "").replace("(", "[").replace(")", "]");
		points = points.replace(",", "],[");
		points = points.replace(" ", ",");

		sb.append("{");
		sb.append("\"coordinates\":[");
		sb.append(points);
		sb.append("],\"bbox\":"+bounds);
		sb.append(",");
		sb.append("\"type\":");
		sb.append("\"LineString\"}");
		
		return sb.toString();
	}
	
	public Geometry tranformPoint(String wkt) {
		String points = null;
		Geometry geometry = new Geometry();
		points = wkt.replace("POINT", "").replace("(", "").replace(")", "");
		String[] pointArray  = points.split(" ");
		geometry.setX(Double.parseDouble(pointArray[0].toString()));
		geometry.setY(Double.parseDouble(pointArray[1].toString()));

		return geometry;
	}	
	
	public String concatDateTime(Date dateSchedule, Date dateTime, int day) {
		
		String strDate ="";
		String strDateTime = "";
		strDate = DateUtilConverter.addDayInDate(dateSchedule, day);
		if(dateTime!=null && !dateTime.toString().isEmpty()) {
			strDateTime = dateTime.toString().substring(0,5);
		}
		return strDate+" "+strDateTime;
	}
	
	public Polyline tranformPolylineGoogle(String wkt) {
		String points = null;
		Polyline polyline = new Polyline();
		
		points = wkt.replace("LINESTRING", "").replace("(", "").replace(")", "");
		points = points.replace(",", "|");
		points = points.replace(" ", ",");

		String[] pointArray  = points.split("\\|");

		if(pointArray!=null && pointArray.length > 0) {
	        String[] latLong = null;
	        
			for(int i = 0; i < pointArray.length; i++) {
				latLong = pointArray[i].split("\\,");	

				if(latLong!=null) {
					 polyline.getPaths().add(new LatLng(Double.parseDouble(latLong[1]),Double.parseDouble(latLong[0])));
				}
			}
		}
        polyline.setStrokeWeight(6);
        polyline.setStrokeColor("#FF0000");
        polyline.setStrokeOpacity(0.7);

        return polyline;
	}

	public Circle tranformPointGoogle(String wkt, Integer radius) {
		String points = null;
		Circle circle = null;
		
		points = wkt.replace("POINT", "").replace("(", "").replace(")", "");
		points = points.replace(" ", ",");

		String[] pointArray  = points.split("\\,");

		if(pointArray!=null && pointArray.length > 0) {
	        LatLng coord = new LatLng(Double.parseDouble(pointArray[1]), Double.parseDouble(pointArray[0]));

	        circle = new Circle(coord, radius);
			circle.setStrokeColor("#FF0000");
			circle.setStrokeOpacity(0.5);
			circle.setFillColor("#00ff00");
			circle.setFillOpacity(0.5);
		}
        return circle;
	}
	
	public String tranformLineStringToPolylineGoogle(String wkt) {
		if(wkt!=null && !wkt.isEmpty()) {
			List<io.leonard.Position> listPosition = new ArrayList<>();
			String retorno = null;
			String points = null;
	
			points = wkt.replace("LINESTRING", "").replace("(", "").replace(")", "");
			points = points.replace(",", "|");
			points = points.replace(" ", ",");
	
			String[] pointArray  = points.split("\\|");
	 
			if(pointArray!=null && pointArray.length > 0) {
		        String[] latLong = null;
		        int q = 0;
		        int h = 0;
		        if(pointArray.length > 200) {
		        	q = pointArray.length / 100;
		        }else {
			        q = pointArray.length;
		        }
				for(int i = 0; i < pointArray.length; i++) {
					if(pointArray[i]!=null && i > 0) {
						if(pointArray.length > 100) {
							if(i == (h+q)) {
								latLong = pointArray[i].split("\\,");
								io.leonard.Position position;
								
								position = Position.fromLngLat(Double.parseDouble(latLong[0]),Double.parseDouble(latLong[1]));
								listPosition.add(position);
								h = i;
							}
							
						}else {
							latLong = pointArray[i].split("\\,");
							io.leonard.Position position;
							
							position = Position.fromLngLat(Double.parseDouble(latLong[0]),Double.parseDouble(latLong[1]));
							listPosition.add(position);
							h = i;
							
						}
					}

	
				}
			}

			if(listPosition!=null && listPosition.size() > 0) {
				retorno = PolylineUtils.encode(listPosition, 5);
				
				return retorno;
			}
		}
		return null;
	}
	
	
	public String tranformLineStringToPolylineGoogleFull(String wkt) {
		if(wkt!=null && !wkt.isEmpty()) {
			List<io.leonard.Position> listPosition = new ArrayList<>();
			String retorno = null;
			String points = null;
	
			points = wkt.replace("LINESTRING", "").replace("(", "").replace(")", "");
			points = points.replace(",", "|");
			points = points.replace(" ", ",");
	
			String[] pointArray  = points.split("\\|");
	
			if(pointArray!=null && pointArray.length > 0) {
		        String[] latLong = null;
				for(int i = 0; i < pointArray.length; i++) {
					latLong = pointArray[i].split("\\,");
					io.leonard.Position position;
								
					//System.out.println(" MAIOR 50 Longitude: "+latLong[0]+" Latitude: "+latLong[1]);
					position = Position.fromLngLat(Double.parseDouble(latLong[0]),Double.parseDouble(latLong[1]));
					listPosition.add(position);
				}
			}

			if(listPosition!=null && listPosition.size() > 0) {
				retorno = PolylineUtils.encode(listPosition, 5);
				
				return retorno;
			}
		}
		return null;
	}
	
	
	public String getWaypoints(String wkt) throws Exception {
		StringBuilder sb = new StringBuilder();
		String points = null;
		
		if(!wkt.isEmpty()) {
			points = wkt.replace("LINESTRING", "").replace("(", "").replace(")", "");
			points = points.replace(",", "|");
			points = points.replace(" ", ",");
		
			String[] pointArray  = points.split("\\|");
		
			if(pointArray!=null && pointArray.length > 0) {
		        int q = 0;
		        int h = 0;
		        if(pointArray.length > 25) {
		        	q = pointArray.length / 25;
		        }else {
			        q = pointArray.length;
		        }
				sb.append("&waypoints=");
				String[] latLong = null;
				for(int i = 0; i < pointArray.length; i++) {
					latLong = pointArray[i].split("\\,");
					if(pointArray.length > 25) {
						if(i == (h+q)) {
							latLong = pointArray[i].split("\\,");
							if(i==0) {
								latLong = pointArray[i].split("\\,");
								sb.append(latLong[1]+','+latLong[0]);
							}else {
								sb.append(URLEncoder.encode("|", "UTF-8"));
								sb.append(latLong[1]+','+latLong[0]);
								
							}
							h = i;
						}
					}else {
						if(i > 0) {
							sb.append(URLEncoder.encode("|", "UTF-8"));
							sb.append(latLong[1]+','+latLong[0]);
							h = i;
						}
					}
				}
			}
		}

		return sb.toString();
		
	}
}
