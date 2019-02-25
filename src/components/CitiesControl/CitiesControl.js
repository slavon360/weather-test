import React, { PureComponent } from 'react';
import Input from '../UI/Input/Input';
import { LayerContext } from '../Layer/Layer';
import Button from '../UI/Button/Button';
import SearchedResults from '../SearchedResults/SearchedResults';

import styles from './CitiesControl.module.scss';

class CitiesControl extends PureComponent {
    state = {
        city: ''
    }
    searchSity = ({ target: { value }}) => {
        const { fetchCities, resetResults } = this.props;
        this.setState({ city: value }, () => {
            if (value && value.trim() !== '') return fetchCities(value);
            resetResults();
        });
    }
    onGetWeather = (name) => {
        const { city } = this.state;
        const { getWeather } = this.props;
        if (typeof name === 'string') {
            this.setState({ city: name }, () => {
                getWeather(name);
            });
        } else if (city && city.trim() !== '') {
            getWeather(city);
        }
    }
    render() {
        const { citiesList, activeCity, noResults, showCitiesList } = this.props;
        return (
            <LayerContext.Consumer>
                {(context) => (
                    <div className={styles.CitiesControl}>
                        <div className={styles.LeftSide}>
                            <div
                                onClick={context.openCitiesList}
                                className={styles.CitiesInput}
                            >
                                <Input
                                    changeValue={this.searchSity}
                                    clsName={styles.InputCity}
                                    placeholder="Start typing..."
                                    value={this.state.city}
                                />
                            </div>
                            {!noResults ?
                                <SearchedResults
                                    noResults={noResults}
                                    results={citiesList}
                                    activeCity={activeCity}
                                    getWeather={this.onGetWeather}
                                    showCitiesList={showCitiesList}
                                /> : null
                            }
                            
                        </div>
                        <div className={styles.RightSide}>
                            <Button
                                clsName={styles.SearchButton}
                                clickHandler={this.onGetWeather}
                            >Search</Button>
                        </div>
                    </div>
                )}
            </LayerContext.Consumer>
        );
    }
}

export default CitiesControl;