import React, { useEffect, useState } from 'react';
import DeckGLMap from "./deckGL.component";
import { AppDispatch } from '../../store';
import { getLayerService } from '../../services/getLayerService';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';

const DeckWrapper = () => {
    const dispatch = useDispatch<AppDispatch>();
    const layerStateData = useSelector(({ layerState }: any) => (layerState), shallowEqual);
    const [geoData, setGeoData] = useState<{ features: [], type: string }>({ features: [], type: "" });

    useEffect(() => {
        dispatch(getLayerService());
    }, [])

    useEffect(() => {
        setGeoData(layerStateData.layerData);
      }, [layerStateData])
      
    return (
        <div>
            <DeckGLMap layerData={geoData} />
        </div>

    );
};

export default DeckWrapper;