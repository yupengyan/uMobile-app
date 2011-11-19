/*
 * Licensed to Jasig under one or more contributor license
 * agreements. See the NOTICE file distributed with this work
 * for additional information regarding copyright ownership.
 * Jasig licenses this file to you under the Apache License,
 * Version 2.0 (the "License"); you may not use this file
 * except in compliance with the License. You may obtain a
 * copy of the License at:
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on
 * an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied. See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
 
var mapDetailTableView, locationDetailTitleBar, locationDetailMap, locationDetail, locationPhoto, topDetailView,onBackBtnClick;

exports.detailView = Titanium.UI.createView(app.styles.view);

exports.render = function (viewModel) {
    var mapImageGroup, mapGroupAddress, directionsButton, directionsButtonRow, detailImageRow, detailImage,
    _tableViewData = [], directionsButtonOptions;
    Ti.API.debug("render() in MapDetailView");
    if (mapDetailTableView) {
        mapDetailTableView.setData([]);
        try {
            exports.detailView.remove(mapDetailTableView);
        }
        catch (e) {
            Ti.API.error("Couldn't remove mapDetailTableView from detailView");
        }
    }
    else {
        Ti.API.debug("mapDetailTableView not defined.");
    }
    
    locationDetailTitleBar = app.UI.createSecondaryNavBar({ 
        backButtonHandler: onBackBtnClick,
        title: viewModel.title,
        btnFloatLeft: true
    });
    exports.detailView.add(locationDetailTitleBar);
    
    mapGroupAddress = Ti.UI.createTableViewSection({
        headerTitle: app.localDictionary.locationDetails
    });
    
    mapGroupAddress.add(Ti.UI.createTableViewRow({
        title: viewModel.title || app.localDictionary.titleNotAvailable
    }));
    
    mapGroupAddress.add(Ti.UI.createTableViewRow({
        title: viewModel.address || app.localDictionary.noAddressAvailable
    }));
    
    if(viewModel.address) {
        directionsButtonOptions = app.styles.contentButton.clone();
        directionsButtonOptions.width = 150;
        directionsButtonOptions.title = app.localDictionary.getDirections;
        directionsButton = Titanium.UI.createButton(directionsButtonOptions);
        // directionsButton.width = 'auto';
        directionsButtonRow = Ti.UI.createTableViewRow();
        directionsButtonRow.add(directionsButton);
        mapGroupAddress.add(directionsButtonRow);
        
        directionsButton.addEventListener("click", function (e) {
            Ti.Platform.openURL('http://maps.google.com/maps?daddr='+ viewModel.address +','+ viewModel.zip +'&ie=UTF8&t=h&z=16');
        });
        directionsButton.addEventListener('touchstart', function (e) {
            directionsButton.backgroundGradient = app.styles.contentButton.backgroundGradientPress;
        });
        directionsButton.addEventListener('touchend', function (e) {
            directionsButton.backgroundGradient = app.styles.contentButton.backgroundGradient;
        });
    }
    
    _tableViewData.push(mapGroupAddress);
    
    if (viewModel.img) {
        mapImageGroup = Ti.UI.createTableViewSection({
            headerTitle: app.localDictionary.locationImage
        });
        detailImageRow = Ti.UI.createTableViewRow(app.styles.mapDetailImageRow);
        detailImage = Titanium.UI.createImageView({
            height: 200,
            image: viewModel.img.replace(/\/thumbnail\//,'/photo/')
        });
        detailImageRow.add(detailImage);
        mapImageGroup.add(detailImageRow);
        _tableViewData.push(mapImageGroup);
    }

    mapDetailTableView = Ti.UI.createTableView(app.styles.mapDetailTableView);
    exports.detailView.add(mapDetailTableView);
    mapDetailTableView.setData(_tableViewData);
    
};

exports.hide = function () {
    exports.detailView.hide();
};

onBackBtnClick = function (e) {
    exports.detailView.hide();
};