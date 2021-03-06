import {compute} from 'cerebral'
import {state} from 'cerebral/tags'

export default compute(
  state`repos.list`,
  function starsCount (repos) {
    return Object.keys(repos).reduce((currentCount, repoKey) => {
      return currentCount + repos[repoKey].stargazers_count
    }, 0)
  }
)
