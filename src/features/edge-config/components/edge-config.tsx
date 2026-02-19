import { useAppDispatch } from '@/core/hooks/useAppDispatch.ts';
import { edgeConfigApi } from '@/features/edge-config';
import { edgeConfigModule } from '@/features/edge-config';
import { useAppSelector } from '@/core/hooks/useAppSelector.ts';

export const EdgeConfig = () => {
  const dispatch = useAppDispatch();

  const htmlAttributes = useAppSelector(
    edgeConfigModule.selectors.htmlAttributes,
  );

  return (
    <div>
      <div>
        <button
          onClick={() =>
            dispatch(edgeConfigModule.asyncActions.getConfig('en'))
          }
        >
          Fetch Config EN
        </button>
        <button
          onClick={() =>
            dispatch(edgeConfigModule.asyncActions.getConfig('fr'))
          }
        >
          Fetch Config FR
        </button>
        <button
          onClick={() =>
            dispatch(edgeConfigModule.asyncActions.getConfig('ko'))
          }
        >
          Fetch Config KO
        </button>
        <button
          onClick={() =>
            dispatch(edgeConfigApi.util.invalidateTags(['EdgeConfig']))
          }
        >
          Invalidate Cache
        </button>
      </div>
      <br />
      <div>
        <div>Edge Lang: {htmlAttributes?.lang}</div>
      </div>
    </div>
  );
};
